import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import fs from "fs";
import path from "path";

// Local fallback store path
const dataDir = path.join(process.cwd(), "data");
const contactsFilePath = path.join(dataDir, "contacts.json");

function saveLocalContact(contact: { name: string; email: string; phone?: string; interest: string; message: string }) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    let existing: any[] = [];
    if (fs.existsSync(contactsFilePath)) {
      const fileData = fs.readFileSync(contactsFilePath, "utf8");
      existing = JSON.parse(fileData || "[]");
    }
    const newEntry = {
      id: "local_" + Date.now(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      interest: contact.interest || "General Inquiry",
      message: contact.message,
      created_at: new Date().toISOString(),
    };
    existing.unshift(newEntry);
    fs.writeFileSync(contactsFilePath, JSON.stringify(existing, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Local storage error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let supabaseSuccess = false;

    // Try Supabase first
    try {
      const supabase = await createClient();
      // Try with phone column
      const { error: errWithPhone } = await supabase.from("contacts").insert([{ name, email, phone: phone || "", interest, message }]);
      if (!errWithPhone) {
        supabaseSuccess = true;
      } else {
        // If phone column does not exist in schema, embed phone in message and retry
        const msgWithPhone = phone ? `[Phone: ${phone}]\n\n${message}` : message;
        const { error: errRetry } = await supabase.from("contacts").insert([{ name, email, interest, message: msgWithPhone }]);
        if (!errRetry) {
          supabaseSuccess = true;
        } else {
          console.warn("Supabase insert notice (fallback to local storage):", errRetry.message);
        }
      }
    } catch (e: any) {
      console.warn("Supabase connection notice:", e?.message);
    }

    // Always ensure inquiry is saved locally with dedicated phone field
    if (!supabaseSuccess) {
      saveLocalContact({ name, email, phone: phone || "", interest: interest || "General Inquiry", message });
    } else {
      // Also backup locally
      saveLocalContact({ name, email, phone: phone || "", interest: interest || "General Inquiry", message });
    }

    return NextResponse.json({ success: true, saved: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

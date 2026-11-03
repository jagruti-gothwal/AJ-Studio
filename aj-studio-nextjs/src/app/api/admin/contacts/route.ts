import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import fs from "fs";
import path from "path";

function isAuthed(request: NextRequest) {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

const dataDir = path.join(process.cwd(), "data");
const contactsFilePath = path.join(dataDir, "contacts.json");

function getLocalContacts() {
  try {
    if (fs.existsSync(contactsFilePath)) {
      const fileData = fs.readFileSync(contactsFilePath, "utf8");
      return JSON.parse(fileData || "[]");
    }
  } catch (err) {
    console.error("Local read error:", err);
  }
  return [];
}

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let allContacts: any[] = [];

  // Fetch from Supabase
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (!error && Array.isArray(data)) {
      allContacts = [...data];
    }
  } catch (err) {
    console.warn("Supabase fetch notice:", err);
  }

  // Merge with local fallback
  const localContacts = getLocalContacts();
  for (const local of localContacts) {
    if (!allContacts.some((c) => c.email === local.email && c.created_at === local.created_at)) {
      allContacts.push(local);
    }
  }

  // Sort newest first
  allContacts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json(allContacts);
}

export async function DELETE(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();

  // Try delete in Supabase
  try {
    const supabase = await createClient();
    await supabase.from("contacts").delete().eq("id", id);
  } catch (err) {}

  // Also delete in local if present
  try {
    if (fs.existsSync(contactsFilePath)) {
      const fileData = fs.readFileSync(contactsFilePath, "utf8");
      let list = JSON.parse(fileData || "[]");
      list = list.filter((c: any) => c.id !== id);
      fs.writeFileSync(contactsFilePath, JSON.stringify(list, null, 2), "utf8");
    }
  } catch (err) {}

  return NextResponse.json({ success: true });
}

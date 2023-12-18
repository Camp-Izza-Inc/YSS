import { db } from "@/db";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const validate = (data) => {
  if (
    !data.name ||
    !data.name?.first_name ||
    !data.name?.last_name ||
    !data.email ||
    !data.password
  ) {
    return false;
  }
  if (data.name?.first_name.length < 2 || data.name?.last_name.length < 2) {
    return false;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    return false;
  }
  if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      data.password
    )
  ) {
    return false;
  } else return true;
};

const emailAvailable = (email) => {
  const account = db.accounts.findUnique({
    where: {
      email: email,
    },
  });
  if (!account) return true;
  else return false;
};

export async function POST(request) {
  const body = await request.json();
  if (!validate(body)) {
    return NextResponse.json(
      { message: "Invalid form inputs" },
      { status: 400 }
    );
  }
  if (!emailAvailable(email)) {
    return NextResponse.json(
      { message: "An account with this email already exists" },
      { status: 400 }
    );
  }

  const account = await db.accounts.create({
    data: {
      id: crypto.randomUUID(),
      email: body.email,
      first_name: body.name.first_name,
      last_name: body.name.last_name,
      account_type: "parent",
    },
  });

  console.log(body);

  return NextResponse.json({
    message: "Registration successful!",
  });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      workspace,
      target_company,
      target_role,
      years_of_experience,
      subject,
      userId,
    } = body;

    // Basic validation
    if (
      !workspace ||
      !target_company ||
      !target_role ||
      !years_of_experience ||
      !subject ||
      !userId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Create Workspace and related Subject
    const result = await prisma.workspace.create({
      data: {
        workspace,
        target_company,
        target_role,
        years_of_experience: Number(years_of_experience),
        userId: Number(userId),

        subjects: {
          create: {
            subject,
          },
        },
      },

      include: {
        subjects: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Workspace created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating workspace:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create workspace",
      },
      { status: 500 }
    );
  }
}
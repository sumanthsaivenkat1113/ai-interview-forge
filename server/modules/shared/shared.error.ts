export function errorHandler(error: any) {
  console.error(error);

  if (error.name === "ZodError") {
    return Response.json(
      { success: false, error: "Validation failed", issues: error.issues },
      { status: 400 }
    );
  }

  if (error.message === "Unauthorized") {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (error.message === "User not found") {
    return Response.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  if (error.code === "P2002") {
    return Response.json(
      { success: false, error: "A user with this email already exists" },
      { status: 409 }
    );
  }

  return Response.json(
    { success: false, error: error.message || "Internal Server Error" },
    { status: 500 }
  );
}
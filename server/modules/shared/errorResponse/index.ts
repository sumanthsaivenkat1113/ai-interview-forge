export function errorHandler(error: any) {
  console.error(error);

  if (error.name === 'ZodError') {
    return Response.json({
      success: false,
      error: 'Validation failed',
      issues: error.issues
    }, { status: 400 });
  }

  return Response.json({
    success: false,
    error: error.message || 'Internal Server Error'
  }, { status: 500 });
}
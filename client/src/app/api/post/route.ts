export async function GET(request: Request) {
  return new Response("Hello, From post!");
};

export async function POST(request: Request) {
  return new Response(request.body);
};

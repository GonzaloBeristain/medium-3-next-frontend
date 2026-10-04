export const dynamic = "force-dynamic";

type HealthResponse = {
  status: string;
  project: string;
  message: string;
};

async function getHealth(): Promise<HealthResponse> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL no está configurada");
  }

  const response = await fetch(`${apiUrl}/api/health/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al consultar la API");
  }

  return response.json();
}

export default async function Home() {
  const health = await getHealth();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-xl">
        <h1 className="text-2xl font-bold mb-4">
          Frontend Next.js
        </h1>

        <p>Status: {health.status}</p>
        <p>Project: {health.project}</p>
        <p>Message: {health.message}</p>
      </div>
    </main>
  );
}
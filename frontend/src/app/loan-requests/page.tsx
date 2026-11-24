import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { LoanRequest, Tool } from "../../lib/loan-types";

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  const { toolId } = await searchParams;
  const trimmedToolId = toolId?.trim();

  const endpoint = trimmedToolId
    ? `/loan-requests?toolId=${encodeURIComponent(trimmedToolId)}`
    : "/loan-requests";
  // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];
  
  const requestsResponse = await apiFetch(endpoint);
  const requests: LoanRequest[] = requestsResponse.ok ? await requestsResponse.json() : [];
  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>
      <section className="panel" aria-label="Loan requests">
        <p>Complete the request list and its filter.</p>
      </section>
    </main>
  );
}

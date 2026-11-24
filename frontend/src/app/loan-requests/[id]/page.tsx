import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { id } = await params;

  const response = await apiFetch(`/loan-requests/${id}`);
  if (!response.ok) {
    notFound();
  }

  const request: LoanRequest = await response.json();

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
        <p><strong>ID:</strong> {request.id}</p>
        <p><strong>Purpose:</strong> {request.purpose}</p>
        <p><strong>Days:</strong> {request.days}</p>
        <p><strong>Tool:</strong> {request.tool.name}</p>
      </section>
    </main>
  );
}

























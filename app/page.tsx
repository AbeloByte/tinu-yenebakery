import Link from "next/link";

export default function Home() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-3xl font-semibold">Yene Bakery</h1>
            <p className="mt-3 text-sm text-gray-600">
                Welcome to the initial project setup. Use the links below to
                access the customer and admin areas.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
                <Link
                    href="/customer"
                    className="rounded-md bg-black px-4 py-2 text-sm text-white"
                >
                    Customer View
                </Link>
                <Link
                    href="/admin"
                    className="rounded-md border border-black px-4 py-2 text-sm"
                >
                    Admin View
                </Link>
            </div>
        </main>
    );
}

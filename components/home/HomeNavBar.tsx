'use client';

const ITEMS = ["Store", "Vault", "Stats"];

export default function HomeNavBar() {
    return (
        <div className="fixed bottom-6 right-6 flex gap-6 text-white/70">
            {ITEMS.map(item => (
                <div
                    key={item}
                    className="cursor-pointer hover:text-cyan-400 transition"
                >
                    {item}
                </div>
            ))}
        </div>
    );
}

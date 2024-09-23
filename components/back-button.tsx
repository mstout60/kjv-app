'use client';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
    backText: string;
}

export default function BackButton({backText}:BackButtonProps) {
    const router = useRouter();
    return (
        <button onClick={router.back}>{backText}</button>
    )
}
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard'); // atau arahkan sesuai nama route yang dibuat
}
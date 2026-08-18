import { RiSettings6Fill } from 'react-icons/ri';
import { Card, CardContent } from '@/components/ui/card';

export default function Maintenence() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <RiSettings6Fill className="size-20 animate-spin text-primary [animation-duration:5s]" />
          <h1 className="text-3xl font-bold">系統維護中</h1>
        </CardContent>
      </Card>
    </main>
  );
}

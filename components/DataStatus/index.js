import { RiErrorWarningLine, RiAlertLine, RiInbox2Line } from 'react-icons/ri';
import { MdInfoOutline } from 'react-icons/md';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';

export default function DataStatus({ content, type, color }) {
  const icon = {
    loading: <Spinner className="size-10" />,
    error: <RiErrorWarningLine />,
    warning: <RiAlertLine />,
    empty: <RiInbox2Line />,
    info: <MdInfoOutline />,
  };

  return (
    <Card className="flex w-full items-center justify-center gap-3 p-6 text-center text-muted-foreground [&_svg]:size-10">
      <div className={type === 'error' ? 'text-destructive' : 'text-primary'}>{icon[type]}</div>
      {content}
    </Card>
  );
}

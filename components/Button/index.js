import Link from 'next/link';
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

function getVariant(color, isTextType) {
  if (isTextType) return 'ghost';
  if (color === 'secondary') return 'secondary';
  if (color === 'danger') return 'destructive';
  return 'default';
}

function getSize(size, isIconType) {
  if (isIconType) return size === 'large' ? 'icon-lg' : 'icon';
  if (size === 'small') return 'sm';
  if (size === 'large') return 'lg';
  return 'default';
}

function Content({ icon, content, children }) {
  return (
    <>
      {icon}
      {content}
      {children}
    </>
  );
}

export default function Button({
  isLink,
  isNextLink,
  flex,
  isIconType,
  isTextType,
  size,
  width,
  color,
  className,
  type = 'button',
  icon,
  content,
  onClick,
  mobile,
  desktop,
  children,
  tippy,
  mono,
  disabled,
}) {
  const variant = getVariant(color, isTextType);
  const buttonSize = getSize(size, isIconType);
  const classes = cn(
    width === 'full' && 'w-full',
    flex && 'justify-start',
    mono && 'font-mono',
    className
  );

  const node = isLink ? (
    <a
      href={isLink}
      className={cn(buttonVariants({ variant, size: buttonSize }), classes)}
      onClick={onClick}
      data-mobile={mobile}
      data-desktop={desktop}
    >
      <Content icon={icon} content={content}>{children}</Content>
    </a>
  ) : isNextLink ? (
    <Link
      href={isNextLink}
      className={cn(buttonVariants({ variant, size: buttonSize }), classes)}
      onClick={onClick}
      data-mobile={mobile}
      data-desktop={desktop}
    >
      <Content icon={icon} content={content}>{children}</Content>
    </Link>
  ) : (
    <ShadcnButton
      type={type}
      variant={variant}
      size={buttonSize}
      className={classes}
      onClick={onClick}
      data-mobile={mobile}
      data-desktop={desktop}
      disabled={disabled}
    >
      <Content icon={icon} content={content}>{children}</Content>
    </ShadcnButton>
  );

  if (!tippy) return node;

  return (
    <Tooltip>
      <TooltipTrigger>{node}</TooltipTrigger>
      <TooltipContent side={tippy.placement || 'top'}>{tippy.content}</TooltipContent>
    </Tooltip>
  );
}

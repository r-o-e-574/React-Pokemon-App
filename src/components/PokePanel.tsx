import React from 'react';

interface PokePanelProps {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
}

const toHeaderTitle = (value: React.ReactNode) =>
  typeof value === 'string' ? <h3 style={{ margin: 0 }}>{value}</h3> : value;

function PokePanel({
  title,
  action,
  className,
  headerClassName,
  titleClassName,
  bodyClassName,
  style,
  width,
  height,
  children
}: PokePanelProps) {
  const panelStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : null),
    ...(height !== undefined ? { height } : null)
  };

  const hasHeader = Boolean(title || action);

  return (
    <section className={className} style={panelStyle}>
      {hasHeader ? (
        <div className={headerClassName}>
          {title ? <div className={titleClassName}>{toHeaderTitle(title)}</div> : null}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {bodyClassName ? <div className={bodyClassName}>{children}</div> : children}
    </section>
  );
}

export default PokePanel;

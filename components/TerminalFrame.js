import React from 'react';

export default function TerminalFrame({ title, tabs = [], active = 0, children }) {
  // Remove frame entirely: return children as-is so pages display without terminal borders.
  return <>{children}</>;
}

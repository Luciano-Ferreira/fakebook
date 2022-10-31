export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code className='font-mono bg-gray-600 rounded px-2 text-red-600'>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span
      // className={
      //   leaf.text === ''
      //     ? 'pl-[0.1px]'
      //     : null
      // }
      {...attributes}
    >
      {children}
    </span>
  );
};

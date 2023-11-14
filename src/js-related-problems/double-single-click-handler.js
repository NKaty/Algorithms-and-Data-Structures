// Handler to handle double and single clicks
// (for example, from the keyboard) in different ways

const onDoubleAndSingleClick = (onDoubleClick = () => {}, onSingleClick = () => {}) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      onDoubleClick();
      return;
    }

    timeout = setTimeout(() => {
      timeout = null;
      onSingleClick();
    }, 500);
  };
};

const handler = onDoubleAndSingleClick(
  () => console.log('Double click'),
  () => console.log('Single click')
);

// Double click
handler();
setTimeout(handler, 50); // Double click

// Two single clicks
setTimeout(handler, 600); // Single click
setTimeout(handler, 1200); // Single click

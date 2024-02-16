export async function sleep(ms: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  await new Promise((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });

  return () => {
    clearTimeout(timeoutId);
  };
}

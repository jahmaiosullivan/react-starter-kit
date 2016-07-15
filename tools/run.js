function format(time)
{
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();

  console.log(`[${format(start)}] Starting '${task.name}${options ? `(${options})` : ''}'...`);

  return task(options).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();

    console.log(`[${format(end)}] Finished '${task.name}${options ? `(${options})` : ''}' after ${time} ms`);
  });
}

const moduleHasNoChildren = process.mainModule.children.length === 0; // Modules that we run e.g start, render etc can't have children
const atLeastOneArgumentSupplied =  process.argv.length > 2;

if (moduleHasNoChildren && atLeastOneArgumentSupplied)
{
  delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle

  let scriptToRun = `${process.argv[2]}.js`;
  const module = require(`./${scriptToRun}`).default;

  run(module).catch((err) => {
                  console.error(err.stack)
             });
}

export default run;

# Local Logger

Simple http server to grab log messages - useful when you can't rely on the JS console e.g. if you need to see logs after the browser window has closed.

## Usage

1. Configure the log sever

- set your `port` number
- set your logger: by default uses a simple 'log to text file' function, but you can write your own / use the local console etc...

2. Start the server:

```
yarn start
```

3. In the project you want to log from, make a POST request to the local log sever anywhere that you'd like to capture a log:

```
    fetch('http://localhost:8080', {
        method: 'POST',
        headers: {},
        body: msg
    });
```

Alternatively, you could redirect `console.log` to the logger:

```
const nativeLog = window.console.log;

window.console.log = (data) => {

    nativeLog(data);

    fetch('http://localhost:8080', {
            method: 'POST',
            headers: {},
            body: data
        });
}
```

4. Run your project and watch the logs roll in!

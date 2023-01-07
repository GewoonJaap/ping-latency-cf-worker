![afbeelding](https://user-images.githubusercontent.com/33700526/211146688-b8058581-3ec3-44fd-911e-e5ecb64b7ddd.png)

# IP and Port Latency Checker
 CloudFlare worker that pings a given IP:port and returns the latency

## Usage
`https://latency.mrproper.dev/?ip=127.0.0.1:80` or `https://latency.mrproper.dev?ip=127.0.0.1&port=80`

## Reponse
```json
  {"latency":7}
```

Latency is in milliseconds

## Deploy
1. Clone this repo
2. Run `wrangler login`
3. Run `wrangler publish`




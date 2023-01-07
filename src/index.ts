export default {
  async fetch(request: any, env: any) {
    return await handleRequest(request)
  }
}

async function handleRequest(request: any) {
  // get ip and port from request params
  const {
    searchParams
  } = new URL(request.url)
  let ip = searchParams.get('ip');
  let port: string | null = null;
  if (ip?.includes(':')) {
    const split = ip.split(':');
    ip = split[0];
    port = split[1];
  } else {
    port = searchParams.get('port');
  }
  const originalHostname = new URL(request.url).hostname;
  if (!ip || !port) {
    return new Response(`ip or port not found, usage: https://${originalHostname}?ip=127.0.0.1&port=80`, {
      status: 400,
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });
  }
  // ping the ip and port and return latency
  const latency = await ping(ip, port);

  const reponse = {
    latency: latency,
  }

  return new Response(JSON.stringify(reponse), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

async function ping(ip: string, port: string): Promise < number > {
  try {
    // ping the ip and port and return latency

    const begin = Date.now();
    console.log('Pinging', ip, port);
    //ping by making a request to the ip and port
    const reponse = await fetch(`http://${ip}:${port}`);
    // get the response time
    const end = Date.now();
    console.log('Pinged in', end - begin, 'ms');

    // return the latency
    return end - begin;
  } catch (e) {
    return 9999;
  }
}
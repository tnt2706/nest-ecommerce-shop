const containerConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  hostName: process.env.HOSTNAME || 'auth-cache',
  port: parseInt(process.env.PORT || '3002', 10),
};

export function getContainerConfig(key: string) {
  return containerConfig[key];
}

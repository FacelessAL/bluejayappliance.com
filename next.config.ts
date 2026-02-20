import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    const oldSlugs = [
      "naperville-il-appliance-repair-service",
      "aurora-il-appliance-repair-service",
      "joliet-il-appliance-repair-service",
      "plainfield-il-appliance-repair-service",
    ];
    const redirects = oldSlugs.map((old) => ({
      source: `/${old}`,
      destination: `/${old.replace("-service", "")}`,
      permanent: true,
    }));
    // Also redirect old city/service combo URLs
    oldSlugs.forEach((old) => {
      redirects.push({
        source: `/${old}/:service`,
        destination: `/${old.replace("-service", "")}/:service`,
        permanent: true,
      });
    });
    return redirects;
  },
};

export default nextConfig;

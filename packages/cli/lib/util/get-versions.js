/** @format */

const { semver } = require("@fe6/cli-utils");

const pkg = require("../../package.json");

let sessionCached;

module.exports = async function getVersions() {
  if (sessionCached) {
    return sessionCached;
  }

  let error;
  const local = pkg.version;
  const latest = local;

  let latestMinor = `${semver.major(latest)}.${semver.minor(latest)}.0`;
  if (
    // if the latest version contains breaking changes
    /major/.test(semver.diff(local, latest)) ||
    // or if using `next` branch of cli
    (semver.gte(local, latest) && semver.prerelease(local))
  ) {
    // fallback to the local cli version number
    latestMinor = local;
  }

  sessionCached = {
    current: local,
    latest,
    latestMinor,
    error
  };

  return sessionCached;
};

import { Environment, getEnvironment } from 'common/utils/environment';

const AmplitudeKeyByEnv: { [env in Environment]: string } = {
  [Environment.PROD]: 'c92804b9b1f5323200e94002a76a86a9',
  [Environment.STAGING]: 'a0a38d854e1f15457d11bf53df9d719e',
  [Environment.DEV]: '9273bc15ce71641291d471c9f17895a5',
};

async function getAmplitude() {
  return window ? import('amplitude-js') : null;
}

export async function initializeAmplitude() {
  const env = getEnvironment();
  const amplitudeKey = AmplitudeKeyByEnv[env];

  getAmplitude().then(amplitude => {
    if (amplitude) {
      amplitude.getInstance().init(amplitudeKey);
    }
  });
}

export function amplitudeLogEvent(eventType: string, properties: any) {
  getAmplitude().then(amplitude => {
    if (amplitude) {
      amplitude.getInstance().logEvent(eventType, properties);
    }
  });
}

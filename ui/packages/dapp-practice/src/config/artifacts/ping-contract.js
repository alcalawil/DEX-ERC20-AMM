import dexAbi from './dex.abi.json';
import erc20Abi from './erc20.abi.json';

const PingArtifact = {
  gas: 4000000,
  erc20: {
    abi: erc20Abi,
    address: '0xc3fB289412071ad2C346b0BB4b2d5F618E5a876E',
  },
  dex: {
    abi: dexAbi,
    address: '0xabe41A0010483F8927750D2A3Aebb468E44d6dd0',
  },
};

export default PingArtifact;

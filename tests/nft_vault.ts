import * as anchor from '@project-serum/anchor';
const { assert, expect } = require('chai');
const {SystemProgram} = anchor.web3;
import {PublicKey} from "@solana/web3.js";
//import { expect } from "chai";

export type Address = string
export const trimLeading0x = (input: string) => (input.startsWith('0x') ? input.slice(2) : input);
export const eqAddress = (a: Address, b: Address) => normalizeAddress(a) === normalizeAddress(b)
export const normalizeAddress = (a: Address) => trimLeading0x(a).toLowerCase()
describe('nft_vault', () => {

  const provider = anchor.Provider.local();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    const idl = JSON.parse(require('fs').readFileSync('./target/idl/nft_vault.json', 'utf8'));

    const programId = new anchor.web3.PublicKey('4vnUE2jn719KZsLas82aYjZHE4x9GtahpWrdXyDv7EZU');
    const program = new anchor.Program(idl, programId);
    const vaultAccount = anchor.web3.Keypair.generate();

    const tx = await program.rpc.newNftVault(
      {
        accounts : {
          vaultAccount : vaultAccount.publicKey,
          admin : provider.wallet.publicKey,
          systemProgram : SystemProgram.programId
        },
        signers : [vaultAccount],
      }
    );
    const vaultState:any = await program.account.vaultState.fetch(vaultAccount.publicKey);
    const statePublicKey: PublicKey = vaultState.admin;
    const walletPublicKey : PublicKey = provider.wallet.publicKey;
    assert.ok(statePublicKey.equals(walletPublicKey));
  });
});

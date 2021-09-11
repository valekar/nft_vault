const anchor = require('@project-serum/anchor');
const { assert, expect } = require('chai');
const {SystemProgram} = anchor.web3;

describe('nft_vault', () => {

  const provider = anchor.Provider.local();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    const program = anchor.workspace.NftVault;
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
    //console.log(program.account.vaultState);
    //const vaultState = await program.account.vaultState.fetch(vaultAccount.publicKey);
    //console.log(provider.wallet.publicKey);
    //console.log(vaultAccount.publicKey);
    //expect(vaultState.admin).to.eqAddress(provider.wallet.publicKey);
    console.log("Your transaction signature", tx);
  });
});

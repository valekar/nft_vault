use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_vault {
    use super::*;
    pub fn new_nft_vault(ctx: Context<NewVault>) -> ProgramResult {
        let account = &mut ctx.accounts.admin;
        emit!(VaultEvent {
            address: *account.key
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewVault<'info> {
    #[account(init, payer = admin, space = 8 + 8)]
    pub vault_account: ProgramAccount<'info, VaultState>,
    pub admin: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

#[account]
#[derive(Default)]
pub struct VaultState {
    pub data: u8,
    //pub admin: Vec<u8>,
}

#[event]
pub struct VaultEvent {
    #[index]
    pub address: Pubkey,
}

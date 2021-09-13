use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_vault {
    use super::*;
    pub fn new_nft_vault(ctx: Context<NewVault>) -> ProgramResult {
        let admin = &mut ctx.accounts.admin;
        let vault_account = &mut ctx.accounts.vault_account;
        vault_account.admin = *admin.key;
        emit!(VaultEvent { admin: *admin.key });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewVault<'info> {
    #[account(init, payer = admin)]
    pub vault_account: ProgramAccount<'info, VaultState>,
    pub admin: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

#[account]
#[derive(Default)]
pub struct VaultState {
    //pub data: u8,
    pub admin: Pubkey,
}

#[event]
pub struct VaultEvent {
    #[index]
    pub admin: Pubkey,
}

use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::AccountInfo,
    stake_history::Epoch,
    msg
};
use std::str;

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,       
    accounts: &[AccountInfo],  
    instruction_data: &[u8],  
  ) -> ProgramResult {

    msg!("This is the entry point.");
    msg!("This is the program_id: {:?}", program_id);
    msg!("These are the accounts: {:?}", accounts);
    msg!("This is the data: {:?}", instruction_data);

    let disp_inst_data = str::from_utf8(instruction_data).unwrap();
    msg!("This is instruction data: {:?}", disp_inst_data);

    match disp_inst_data {
      "increment" => msg!("LIB: INCREMENT"),
      "decrement" => msg!("LIB: DECREMENT"),
      "reset"     => msg!("LIB: RESET"),
      _           => msg!("LIB: UNKNOWN: {:?}", disp_inst_data)
    }

    Ok(())
}

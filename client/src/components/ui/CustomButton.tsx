import { CustomButtonProps }from '../../types/index'
import { Button } from '@material-ui/core'

const CustomButton = (  {btnType,titile,containerStyles,
  textStyles,handleClick}
  :CustomButtonProps ) => {
  return (
      <Button 
      onClick={handleClick }
      className={`${containerStyles}`} 
      type={btnType||'button'} 
      variant='contained'>
        <span className={`${textStyles}`} >
        {titile}
        </span>
      </Button>
  )
}

export default CustomButton

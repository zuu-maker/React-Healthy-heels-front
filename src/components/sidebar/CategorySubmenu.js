import React,{useState} from 'react';
import styled from 'styled-components'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Radio } from '@mui/material';


export default function CategorySubmenu({title, content, isRow, Icon}) {

  const [value, setValue] = React.useState(content[0].value);
  const [show,setShow] = useState(true)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <Container>
           <InnerContainer>
              {show ? <ArrowDropDownIcon fontSize="large" onClick={() => setShow(!show)}/>: <ArrowRightIcon fontSize="large" onClick={() => setShow(!show)}/>}
              {isRow ? <Textt>{title}</Textt>:<IconContainer> <Icon sx={{fontSize:'0.85rem', cursor: 'pointer'}} /><Text>{" "+title}</Text> </IconContainer>  } 
            </InnerContainer>
            
            { show && <FormControl component="fieldset">
            <RadioGroup
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                control={<Radio />}
            >
              {isRow ? 
                <Row>
                {content.map(item =>  <FormControlLabel value={item.value} control={<Radio size="small" color="success" />}  label={item.label} />)}
                </Row>
                :
                content.map(item =>  <FormControlLabel value={item.value} control={<Radio size="small" color="success" />} label={item.label} />)
              }
              
            </RadioGroup>
        </FormControl>}
    </Container>
  );
}

const Container = styled.div`
width: 100%;
margin-top: 24px;
@media (max-width: 424px) {
  /* padding-left: 1rem; */
}

/* height: 12rem; */
/* display: flex;
justify-content:flex-start; */
`

const InnerContainer = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    &:hover {
        color:#90ee90;
        transition: all 0.3s 0.2s ease-in-out;
    }
`

const Row = styled.div`
 display: flex;
`

const IconContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    
    font-weight: 400;
    font-size:1.2rem;
    
`

const Textt = styled.p`
    font-weight: 400;
    font-size:1.2rem;
`




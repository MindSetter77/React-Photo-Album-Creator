import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, TextField, Card, CardMedia, Slider, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const Layers = ({layerTable, pageNumber, lessMoreTable, rmPhotoClick, lessMoreClick, makeLayerUP, makeLayerDown, handleWidthSliderChange, xTable, originalPageWidth, handleXSliderChange, yTable, originalPageHeight, handleYSliderChange, alignWidth, getLayerTitle, editText, fonts, handleColorPickerVisibility, textColor, showLayerPicker, ChromePicker, setSingleColorText, rotateTable, setRotateTable, borderTable, setBorderTable, shadowTable, setShadowTable}) => {

  const [borderShowColorTable, setBorderShowColorTable] = useState(() => {
    const rows = 50;
    const cols = 0;
    // Tworzymy tablicę 2D
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => 0) // Wypełnienie wartościami domyślnymi
    );
  });

  const handleRotateSliderChange = (pageNumber, index, value) => {
    let cpy = [...rotateTable]
    cpy[pageNumber][index] = value
    setRotateTable(cpy)
  }

  const changeBorder = (pageNumber, index, value) => {
    if(borderTable[pageNumber][index] === 'None'){
      let str = `7px ${value} black`
      const borderCpy = [...borderTable]
      borderCpy[pageNumber][index] = str
      setBorderTable(borderCpy)
      

    } else {
      let str = borderTable[pageNumber][index]
      let tab = str.split(" ")
      let ret = tab[0] + " " + value + " " + tab[2]

      let borderCpy = [...borderTable]
      borderCpy[pageNumber][index] = ret
      setBorderTable(borderCpy)
    }
  }

  const lowerPxOnBorder = (idx) =>{
    let borderCpy = [...borderTable]
    let val = borderCpy[pageNumber][idx]
    let num = val[0]

    if(num > 1){
      num = num - 1
      let ret = num + val.substring(1)
      borderCpy[pageNumber][idx] = ret
      setBorderTable(borderCpy)
    }
  }

  const morePxOnBorder = (idx) => {
    let borderCpy = [...borderTable]
    let val = borderCpy[pageNumber][idx]
    let num = val[0]

    if(num < 9){
      num = Number(num) + 1
      let ret = num + val.substring(1)
      borderCpy[pageNumber][idx] = ret
      
      setBorderTable(borderCpy)
    }
  }

  const showPicker = (idx) => {
    let cpyTab = [...borderShowColorTable]
    cpyTab[pageNumber][idx] = true
    setBorderShowColorTable(cpyTab)

  }

  const setColor = (color, index) => {

    let borderTabCpy = [...borderTable]
    let val = borderTabCpy[pageNumber][index]
    let splited = val.split(" ")
    
    let ret = splited[0] +" "+ splited[1] +" "+ color
    borderTabCpy[pageNumber][index] = ret
    setBorderTable(borderTabCpy)

    
  }

  const hideBorderColorPicker = (index) => {
    let tabCpy = [...borderShowColorTable]

    tabCpy[pageNumber][index] = false
    setBorderShowColorTable(tabCpy)
    console.log(index)
  }

  const handleShadowSliderChange = (idx, val) => {
    
    let shadowCpy = [...shadowTable]
    shadowCpy[pageNumber][idx] = val


    setShadowTable(shadowCpy)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '2px solid black', borderRadius: '15px', width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', overflow: 'hidden', backgroundColor: 'white', zIndex: 10, position: 'relative', boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.5)'}}>
      
      <div style={{ width: '100%', height: '30px', backgroundColor: 'black', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: 'white' }}>
        <div style={{ display: 'flex', color: 'white' }}>
            <Typography style={{ marginTop: '3px', marginLeft: '5px' }}>Layers</Typography>
        </div>
      </div>



      
      <div style={{flex: '1', minHeight: 'calc(100vh - 600px)', maxHeight: '200px', width: '100%', overflowY: 'scroll', borderRadius: '15px'}}>
      {layerTable[pageNumber].map((item, index) => (
        item.startsWith("http")?(
        
        <div style={{marginTop: '5px', marginLeft: '5px', display: 'flex', flexDirection: 'column', width: '96%', border: '2px solid black', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          {lessMoreTable[pageNumber][index] === 'Less' ? (
            <div>
              <div style={{display: 'flex'}}>
                <img onClick={() => console.log(index)}  key={index} src={item} alt={`Photo ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                <div style={{ width: '100%', padding: '5px'}}>
                  <div style={{display: 'flex'}}>
                    <Typography >{`Photo ${index+1}`}</Typography>
                    <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                    <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>↓</div>
                    <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>↑</div>
                    <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black'}}>×</div>
                  </div>
                  <div style={{display: 'flex'}}> 
                    <Typography>Width: </Typography>
                    <Slider defaultValue={100} aria-label="Default" valueLabelDisplay="auto" min={1} max={200} onChange={(event, value) => handleWidthSliderChange(pageNumber, index, value)}/>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex'}}>
                <div style={{width: '90%'}}>
                  <div style={{display: 'flex', margin: '5px'}}>
                    <Typography style={{margin: '5px', marginLeft: '25px'}}>X</Typography>
                    <Slider value={xTable[pageNumber][index] || 0} onChange={(event, value) => handleXSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageWidth} style={{width: '230px', marginLeft: '38px'}}/>
                  </div>
                  <div style={{display: 'flex', margin: '5px'}}>
                    <Typography style={{margin: '5px', marginLeft: '25px'}}>Y</Typography>
                    <Slider value={yTable[pageNumber][index] || 0} onChange={(event, value) => handleYSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageHeight} style={{width: '230px', marginLeft: '38px'}}/>
                  </div>
                  <div style={{display: 'flex', margin: '5px'}}>
                    <Typography style={{margin: '5px', marginRight: '10px'}}>Rotate</Typography>
                    <Slider value={rotateTable[pageNumber][index] || 0} onChange={(event, value) => handleRotateSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={360} style={{width: '230px', marginLeft: '10px'}}/>
                  </div>
                  <div style={{display: 'flex', margin: '5px'}}>
                    <Typography style={{margin: '5px', marginRight: '10px'}}>Border</Typography>
                    <Select
                      labelId="photo-limit-label"
                      value={borderTable[pageNumber][index] === 'None' ? (borderTable[pageNumber][index]) : (borderTable[pageNumber][index].split(" ")[1])}
                      onChange={(event) => changeBorder(pageNumber, index, event.target.value)}
                      label="Page Size"
                      style={{height: '34px', width: '100px'}}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value="Solid">Solid</MenuItem>
                      <MenuItem value="Dotted">Dotted</MenuItem>
                      <MenuItem value="Dashed">Dashed</MenuItem>
                      <MenuItem value="Double">Double</MenuItem>
                      <MenuItem value="Groove">Groove</MenuItem>
                    </Select>
                    {borderTable[pageNumber][index] === 'None' ? null : (
                      <div style={{display: 'flex', marginLeft: '5px', marginTop: '3px'}}>
                        <div onClick={() => lowerPxOnBorder(index)} style={{marginRight: '5px'}}>◀</div>
                        <div>{borderTable[pageNumber][index][0]}</div>
                        <div onClick={() => morePxOnBorder(index)} style={{marginLeft: '5px'}}>▶</div>
                        
                        <div onClick={() => {showPicker(index)}} style={{height: '20px', width: '20px', backgroundColor: `${borderTable[pageNumber][index].split(" ")[2]}`}}></div>

                        
                        
                      </div>
                    )}
                    
                  </div>
                  {borderShowColorTable[pageNumber][index] === true ? (
                    <div style={{marginLeft: '20%'}}>
                      <div style={{width: '89%', border: '1px solid black', borderTopLeftRadius: '13px', borderTopRightRadius: '13px', overflow: 'hidden'}}><div onClick={() => hideBorderColorPicker(index)} style={{height: '100%', width: '100%', cursor: 'pointer'}}>close</div>
                        <ChromePicker
                          color={textColor[pageNumber][index]}
                          onChangeComplete={(color) => setColor(color.hex, index)}
                        />
                      </div>
                    </div>
                        ) : null}
                  <div style={{display: 'flex', margin: '5px'}}>
                    <Typography style={{margin: '5px', marginRight: '10px'}}>Shadow</Typography>
                    <Slider value={shadowTable[pageNumber][index] || 0} onChange={(event, value) => handleShadowSliderChange(index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={15} style={{width: '230px'}}/>
                  </div>
                </div >
                <div>
                  <div onClick={() => alignWidth(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', width: '25px', height: '25px', border: '2px solid black', marginLeft: 'auto', marginRight: 'auto', marginTop: '4px'}}> w </div>
                </div>
            </div>
            </div>
          ):(
            <div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img onClick={() => rmPhotoClick(index)}  key={index} src={item} alt={`Photo ${index + 1}`} style={{ width: '50px', height: 'auto', margin: '5px' }} />
                <div style={{ width: '100%', padding: '5px'}}>
                  <div style={{display: 'flex'}}>
                    <Typography >{`Photo ${index+1}`}</Typography>
                    <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                    <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>↓</div>
                    <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>↑</div>
                    <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black'}}>×</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          
        </div>): item.startsWith("TYPOGRAPHY")?(
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <div style={{marginTop: '5px', display: 'flex', flexDirection: 'column', width: '96%', border: '2px solid black', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
              <div style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>

                <Typography style={{marginLeft: '10px'}}>{getLayerTitle(layerTable[pageNumber][index])}</Typography>
                <div onClick={() => lessMoreClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '45px', height: '20px', border: '2px solid black', marginLeft: 'auto'}}>{`${lessMoreTable[pageNumber][index]}`}</div>
                <div onClick={() => makeLayerUP(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black', marginLeft: '5px'}}>↓</div>
                <div onClick={() => makeLayerDown(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px', marginLeft: '5px'}}>↑</div>
                <div onClick={() => rmPhotoClick(index)} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '7px', width: '20px', height: '20px', border: '2px solid black',  marginRight: '5px'}}>×</div>
              
              </div>
              {lessMoreTable[pageNumber][index] !== 'Less' ? null : (
                <div>
                <div style={{display: 'flex'}}>
                  <TextField
                    id="outlined-required"
                    label="text"
                    defaultValue={item.split(".")[5]}
                    multiline
                    minRows={3}
                    maxRows={3}
                    style={{margin: '5px', marginRight: '10px', width: '90%'}}
                    onChange={(event) => editText(event.target.value, item, pageNumber, index, 5)}
                  />
                  <div style={{marginTop: '5px', marginRight: '5px'}}>
                    <div onClick={() => {item.split(".")[1] === "false" ? editText('true', item, pageNumber, index, 1) : editText('false', item, pageNumber, index, 1)}}  style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', fontWeight: 'bold', userSelect: 'none'}}>B</div>
                    <div onClick={() => {item.split(".")[2] === "false" ? editText('true', item, pageNumber, index, 2) : editText('false', item, pageNumber, index, 2)}} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', marginTop: '5px', fontStyle: 'italic', userSelect: 'none'}}>I</div>
                    <div onClick={() => {item.split(".")[3] === "false" ? editText('true', item, pageNumber, index, 3) : editText('false', item, pageNumber, index, 3)} } style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9px', width: '25px', height: '25px', border: '2px solid black', marginTop: '5px', textDecoration: 'underline', userSelect: 'none'}}>U</div>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', width: '100%',margin: '5px'}}>
                  <Typography>Font:</Typography>
                  <FormControl style={{width: '40%'}}>
                  <Select
                    labelId="font-select-label"
                    value={`${item.split(".")[6]}`}
                    onChange={(event) => {editText(event.target.value, item, pageNumber, index, 6)}}
                    style={{height: '30px', width: '150px'}}
                  >
                    {fonts.map((font) => (
                      <MenuItem key={font.name} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                  <div style={{display: 'flex', alignItems: 'center', marginLeft: '25px'}}>
                    <Typography style={{marginLeft: '10px'}}>size:</Typography>
                    <div style={{display: 'flex',alignItems: 'center', width: '95px'}}>
                      <div onClick={() => {editText(parseInt(item.split(".")[4])-1, item, pageNumber, index, 4)}} style={{marginLeft: 'auto', cursor: 'pointer', userSelect: 'none', width: '25px', height: '25px', border: '2px solid black', borderRadius: '10px'}} >←</div>
                      <Typography style={{fontSize: '18px', marginTop: '3px', marginRight: '5px', marginLeft: '5px'}}>{`${item.split(".")[4]}`}</Typography>
                      <div onClick={() => {editText(parseInt(item.split(".")[4])+1, item, pageNumber, index, 4)}} style={{cursor: 'pointer', userSelect: 'none', width: '25px', height: '25px', border: '2px solid black', borderRadius: '10px'}} >→</div>
                    </div>
                  </div>
                
                </div>
                <div>
                  <div style={{display: 'flex'}}>
                    <Typography style={{marginRight: '5px', marginLeft: '5px', marginTop: '3px'}}>X</Typography>
                    <Slider style={{width: '200px', marginLeft: '10px'}} value={xTable[pageNumber][index] || 0} onChange={(event, value) => handleXSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageWidth}/>
                    <Typography style={{marginTop: '3px'}} >{`${xTable[pageNumber][index]}`}</Typography>
                  </div>
                  <div style={{display: 'flex', marginLeft: '5px'}}>
                    <Typography style={{marginRight: '5px'}}>Y</Typography>
                    <Slider style={{width: '200px', marginLeft: '10px'}} value={yTable[pageNumber][index] || 0} onChange={(event, value) => handleYSliderChange(pageNumber, index, value)} aria-label="Default" valueLabelDisplay="auto" min={0} max={originalPageHeight}/>
                    <Typography style={{marginTop: '3px'}}>{`${yTable[pageNumber][index]}`}</Typography>
                  </div>
                <div style={{display: 'flex'}}>
                  <Typography style={{marginLeft: '5px', marginBottom: '5px'}}>Color: </Typography>
                  <div onClick={() => handleColorPickerVisibility(index)} style={{width: '15px', height: '15px', backgroundColor: `${textColor[pageNumber][index]}`, marginTop: '5px', marginLeft: '5px'}}></div>
                  {showLayerPicker[pageNumber][index] === true ? (
                    <ChromePicker
                    color={textColor[pageNumber][index]}
                    onChangeComplete={(color) => setSingleColorText(color.hex, index)}
                  />
                  ) : (<div></div>)}
                  </div>
                </div>
                
              </div>
              )}
              
              
          </div>
            
        </div>
          
        ) : (<div></div>)
        
      ))}
      </div>
      </div>
    
    )
};

export default Layers;
import { Button, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Image } from 'components/image/Image'
import logoWhite from 'img/layout/logoWhite.png'
import { Instagram, Facebook, Twitter ,Linkdin} from '../../icons/Icons'

export default function SidebarDocs () {
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
  const borderColor = useColorModeValue('white', 'navy.800')
  const iconColor = useColorModeValue('secondaryGray.500', 'white')


  return (
    <div>
      <Flex align='center'>
                        
                              <Facebook/>
                           
                              <Instagram/>
                          
                              <Twitter/>
                              <Linkdin/>

                              

                      </Flex>
                      <Flex w='100%'>
                      <Button
                      style={{backgroundColor:"#2EBC96"}}
                        me='100%'
                        mb='50px'
                        w='120px'
                        minW='120px'
                        mt={{ base: '20px', '2xl': 'auto' }}
                        variant='brand'
                        fontWeight='500'>
                        Connect
                      </Button>
                    </Flex>

                    <Flex style={{marginTop:-40}}>
                    {/* <Button
                        me='100%'
                        mb='50px'
                        w='60px'
                        minW='60px'
                        mt={{ base: '20px', '2xl': 'auto' }}
                        variant='brand'
                        fontWeight='500'>
                        Buy
                      </Button> */}
                      <Button
                      style={{marginRight:10,backgroundColor:"#2EBC96"}}
                        minW='50px'
                        variant='brand'
                        >
                        Buy
                      </Button>
                      <Button
                      style={{backgroundColor:"#2EBC96"}}
                        minW='50px'
                        variant='brand'
                        >
                        Sell
                      </Button>
                      </Flex>
                    </div>
  )
}

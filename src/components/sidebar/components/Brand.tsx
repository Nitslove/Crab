// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import Image from 'next/image';
import MemeCoin from "../../../img/allImg/logo.png";

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('#191b1f', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src={MemeCoin}></Image>
			</Flex>
	);
}

export default SidebarBrand;

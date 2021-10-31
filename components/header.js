import { Button } from '@chakra-ui/button'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import ThemeToggleButton from './themeToggleButton'
// import useAuth from '../src/hook/auth'
import { HamburgerIcon } from '@chakra-ui/icons'
import useAuth from '../src/hook/auth'

const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Header = props => {
  const { user, logout } = useAuth()
  const { path } = props

  return (
    <Box
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      {...props}
    >
      <Container
        maxW={'container.xl'}
        p={2}
        display="flex"
        justifyContent="space-between"
      >
        <NextLink href="/" passHref>
          <Heading cursor="pointer" as="h2">
            prechat
          </Heading>
        </NextLink>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          align="center"
        >
          <LinkItem href="/test1" path={path}>
            test 1
          </LinkItem>
          <p>test 2</p>
          <p>test 3</p>
        </Stack>

        <Stack direction="row" spacing={2}>
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                {user ? (
                  <MenuItem onClick={logout} as={Link}>
                    sign out
                  </MenuItem>
                ) : (
                  <>
                    <NextLink href="/login" passHref>
                      <MenuItem as={Link}>Login</MenuItem>
                    </NextLink>
                    <NextLink href="/register" passHref>
                      <MenuItem as={Link}>Register</MenuItem>
                    </NextLink>
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
          <Box display={{ base: 'none', md: 'flex' }}>
            {user ? (
              <Button onClick={logout} colorScheme="teal" variant="outline">
                sign out
              </Button>
            ) : (
              <Stack direction="row" spacing={2}>
                <NextLink href="/auth/login" pathHref>
                  <Button colorScheme="teal">sing in</Button>
                </NextLink>
                <NextLink href="/auth/register" pathHref>
                  <Button colorScheme="teal" variant="outline">
                    register
                  </Button>
                </NextLink>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header

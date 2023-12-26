import Link from "next/link";
import {
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {Link as Scroll} from 'react-scroll'
import { Box, MenuItem, TextField, styled, useTheme } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import api from "utils/__api__/products";
import {useRouter} from 'next/router'
const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: { display: "none" },
}));

const SearchInputWithCategory: FC = () => {
  const parentRef = useRef();
  const { breakpoints } = useTheme();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [resultList, setResultList] = useState('');
  const [categoryTitle, setCategoryTitle] = useState("Menu");
  const router = useRouter()
  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange =
    (cat: { title: string; value: string }) => () => {
      setCategory(cat.value);
      setCategoryTitle(cat.title);
    };

  // FETCH PRODUCTS VIA API
  // const getProducts = async (searchText: string, category?: string) => {
  //   const data = await api.searchProducts(searchText, category);
  //   setResultList(data);
  // };

  const handleSearch = (e: any) => {
    startTransition(() => {
      const value = e.target?.value;
      
       setResultList(value);

     

    });
  };
  const handleEnter = (e) => {
    e.preventDefault()
    router.push(`/product/search/${resultList}`)
    
  }
  // const handleDocumentClick = () => setResultList([]);

  // useEffect(() => {
  //   window.addEventListener("click", handleDocumentClick);
  //   return () => window.removeEventListener("click", null);
  // }, []);

  // CATEGORY MENU DROPDOWN
  const categoryDropdown = (
    <BazaarMenu
      direction="left"
      sx={{ zIndex: breakpoints.down("md") ? 99999 : 1502 }}
      handler={
        <DropDownHandler
          px={3}
          gap={0.5}
          height="100%"
          color="grey.700"
          bgcolor="grey.100"
          alignItems="center"
          component={TouchRipple}
        >
          {categoryTitle}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>
      }
    >
      {categories.map((item) => (
          <MenuItem key={item.value} onClick={handleCategoryChange(item)}>
        <Scroll to={item.value}>{item.title}</Scroll>
        </MenuItem>
      ))}
    </BazaarMenu>
  );

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <form onSubmit={(e) => handleEnter(e)}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm..."
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />
      </form>

      {/* {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )} */}
    </Box>
  );
};

const categories = [
  { title: "Menu", value: "*" },
  { title: "Trái cây", value: "traicay" },
  { title: "Hủ tiếu", value: "hutieu" },
  { title: "Khô", value: "kho" },
  { title: "Bánh kẹo", value: "banhkeo" },
  { title: "Yến", value: "yen" },
  
  // { title: "Laptop", value: "laptop" },
  // { title: "Desktop", value: "desktop" },
  // { title: "Camera", value: "camera" },
  // { title: "Toys", value: "toys" },
];

export default SearchInputWithCategory;

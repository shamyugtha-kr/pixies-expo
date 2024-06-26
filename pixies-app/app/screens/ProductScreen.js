import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { deals } from "../data/DealsData";
import WishList from "../components/WishList";
import Cart from "../components/Cart";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Like from "../components/Like";
import Addtocart from "../components/Addtocart";
import StarRate from "../components/StarRate";
import Share_btn from "../components/Share_btn";

const DotIndicator = ({ dataLength, currentIndex }) => {
  const dots = Array.from({ length: dataLength }, (_, index) => index);
  return (
    <View style={styles.indicaorContainer}>
      {dots.map((dotIndex) => (
        <View
          key={dotIndex}
          style={[
            styles.dot,
            dotIndex === currentIndex ? styles.activeDot : null,
          ]}
        />
      ))}
    </View>
  );
};

const ProductScreen = ({ route }) => {
  const { id } = route.params;
  const selectedIndex = deals.findIndex((item) => item.id === id);
  const product = deals[selectedIndex];
  const screenwidth = useWindowDimensions("window").width;
  const [currentIndex, setcurrentIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "92%",
          alignItems: "center",
          marginLeft: 30,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <View>
          <Image
            source={require("../assets/logoname.png")}
            style={styles.logoname}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="bell-o"
            size={21}
            color="black"
            style={{ marginHorizontal: 15 }}
          />

          <WishList />
          <Cart />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <FlatList
          data={product.carouselImages}
          renderItem={({ item }) => {
            return (
              <Image
                source={item}
                style={{
                  resizeMode: "cover",
                  width: screenwidth,
                  height: screenwidth,
                }}
              />
            );
          }}
          onScroll={(event) => {
            const { contentOffset, layoutMeasurement } = event.nativeEvent;
            const currentIndex = Math.floor(
              contentOffset.x / layoutMeasurement.width
            );
            setcurrentIndex(currentIndex);
          }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
        <View style={{ position: "relative", bottom: -20 }}>
          <DotIndicator
            dataLength={product.carouselImages.length}
            currentIndex={currentIndex}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 40,
              justifyContent: "space-between",
              marginRight: 15,
            }}
          >
            <Text
              style={{
                marginHorizontal: 15,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {" "}
              {product.title}
            </Text>
            <Share_btn />
          </View>
          <Text
            style={{
              marginHorizontal: 15,
              marginTop: 10,
              fontSize: 15,
              fontWeight: 500,
              color: "grey",
            }}
          >
            {" "}
            {product.subtitle}{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 15,
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                }}
              >
                <StarRate
                  rating={product.rating}
                  starSize={20}
                  fullStarColor={"#fd5780"}
                />
              </Text>
            </View>
            <Text style={{ padding: 10, color: "#bbb9b9", fontSize: 15 }}>
              |
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="verified"
                size={24}
                color="#00adef"
                style={{ paddingRight: 5 }}
              />
              <Text style={{ fontSize: 13, fontWeight: 500 }}>
                {" "}
                5000+ Verified Reviews
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 15,
              marginTop: 10,
              alignItems: "baseline",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              ₹{product.price}
            </Text>
            <Text
              style={{
                textDecorationLine: "line-through",
                color: "#a3a3a3",
                fontWeight: 300,
                paddingHorizontal: 10,
                fontSize: 13,
              }}
            >
              ₹{product.oldPrice}
            </Text>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 11,
                color: "grey",
              }}
            >
              INCLUSIVE OF ALL TAXES{" "}
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: "#c3c3c3",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "grey",
                marginLeft: 15,
                paddingTop: 10,
              }}
            >
              Sold by :{" "}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "black",
                paddingTop: 10,
              }}
            >
              Pixies E retail limited
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#f4f4f4",
              height: 100,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 50,
                flexDirection: "row",

                backgroundColor: "white",
                width: "100%",
                marginTop: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#fff1f5",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Octicons name="verified" size={24} color="#fd5780" />
                <Text style={{ paddingHorizontal: 10, fontWeight: 500 }}>
                  {" "}
                  100% Authentic
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderRightColor: "#fff1f5",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="return-up-back" size={24} color="#fd5780" />
                <Text style={{ paddingHorizontal: 10, fontWeight: 500 }}>
                  {" "}
                  Easy Return Policy
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 25,
                marginTop: 10,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#c3c3c3",
                paddingBottom: 10,
              }}
            >
              <View>
                <MaterialIcons
                  name="domain-verification"
                  size={24}
                  color="green"
                />
              </View>
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  Delivery within 5 days
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                    paddingTop: 5,
                  }}
                >
                  642126 - Coimbatore
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 25,
                marginTop: 10,
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={24}
                  color="grey"
                />
                <View style={{ paddingLeft: 15 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12 }}>
                    Free delivery
                  </Text>
                  <Text style={{ fontWeight: 400, fontSize: 12 }}>
                    above ₹299
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingLeft: 100 }}>
                <MaterialCommunityIcons
                  name="account-cash-outline"
                  size={24}
                  color="gray"
                />
                <View style={{ paddingLeft: 15 }}>
                  <Text style={{ fontWeight: 400, fontSize: 12 }}>
                    COD on oders
                  </Text>
                  <Text style={{ fontWeight: 400, fontSize: 12 }}>
                    above ₹250
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 25, backgroundColor: "#f4f4f4" }}></View>
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Product Description
          </Text>
          <Text
            style={{
              paddingTop: 10,
              textAlign: "justify",
              lineHeight: 25,
              color: "grey",
              fontWeight: 500,
            }}
          >
            {" "}
            {product.description}{" "}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 600, paddingTop: 10 }}>
            Key Ingredients
          </Text>
          <Text
            style={{
              paddingTop: 10,
              textAlign: "justify",
              lineHeight: 25,
              color: "grey",
              fontWeight: 500,
            }}
          >
            {" "}
            {product.ingredients}{" "}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 600, paddingTop: 10 }}>
            Additional Information
          </Text>
          <Text
            style={{
              paddingTop: 10,
              textAlign: "justify",
              lineHeight: 25,
              color: "grey",
              fontWeight: 500,
              paddingBottom: 20,
            }}
          >
            {" "}
            {product.additionalInfo}{" "}
          </Text>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Like
            customStyle={{
              marginTop: 15,
              marginHorizontal: 35,
            }}
            likesize={26}
            dealId={id}
          />
        </View>
        <View>
          <Addtocart
            bagsize={25}
            carttext={20}
            customcart={{
              height: 50,
              paddingVertical: 9,
              fontSize: 50,
              fontWeight: "500",
              marginHorizontal: 0,
              alignItems: "center",
              width: 300,
              justifyContent: "center",
            }}
            dealId={product.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  logoname: {
    width: 80,
    height: 38.4,
  },
  indicaorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(145,145,145,0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 6,
    height: 6,

    backgroundColor: "#fd5780",
  },
});

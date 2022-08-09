import react from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text} {...rest}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});

export default Button;

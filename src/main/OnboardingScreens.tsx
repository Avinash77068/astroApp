import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import Svg, { Circle, Path, Polygon, Line } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    title: "Check Matches With Other Zodiac Signs and Friends",
    description:
      "Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.",
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <Circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <Circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          const x = 100 + 70 * Math.cos(angle);
          const y = 100 + 70 * Math.sin(angle);
          return <Circle key={i} cx={x} cy={y} r="3" fill="rgba(255,255,255,0.5)" />;
        })}
        <Path d="M100 100 L100 40 M100 100 L160 100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      </Svg>
    ),
  },
  {
    title: "Your Compatibility With The Famous Celebrity",
    description:
      "Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.",
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <Circle cx="70" cy="70" r="15" fill="rgba(255,255,255,0.2)" />
        <Circle cx="130" cy="70" r="15" fill="rgba(255,255,255,0.2)" />
        <Circle cx="70" cy="130" r="15" fill="rgba(255,255,255,0.2)" />
        <Circle cx="130" cy="130" r="15" fill="rgba(255,255,255,0.2)" />
        <Polygon
          points="100,50 120,90 165,90 130,115 145,155 100,130 55,155 70,115 35,90 80,90"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />
      </Svg>
    ),
  },
  {
    title: "Start Each Day With Tarot Reading to Avoid Troubles",
    description:
      "Our comprehensive matching system will narrow your options to look for an ideally compatible relationship and provide you with insight into friends.",
    icon: (
      <Svg width={200} height={200} viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <Path
          d="M100 40 Q130 70 100 100 Q70 130 100 160"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
        />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 100 + 50 * Math.cos(angle);
          const y1 = 100 + 50 * Math.sin(angle);
          const x2 = 100 + 70 * Math.cos(angle);
          const y2 = 100 + 70 * Math.sin(angle);
          return (
            <Line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          );
        })}
      </Svg>
    ),
  },
];

export default function OnboardingScreens({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <LinearGradient
      colors={["#4a148c", "#6a1b9a"]}
      style={styles.container}
    >
      <View style={styles.main}>
        <View style={styles.iconContainer}>{slides[currentSlide].icon}</View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSkip} style={[styles.button, styles.skipButton]}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
            <Text style={styles.nextText}>
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    gap: 40,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  footer: {
    width: "100%",
    padding: 30,
    gap: 25,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  activeDot: {
    width: 24,
    backgroundColor: "#7c4dff",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#7c4dff",
  },
  skipText: {
    color: "white",
    fontWeight: "500",
  },
  nextText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 6,
  },
});

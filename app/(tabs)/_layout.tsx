import { Tabs } from "expo-router";
import { Home, LogIn, Menu, ScanLine, Search } from "lucide-react-native";
import React from "react";
import { useColorScheme } from "react-native";

import { Colors } from "@/colors";

// A reusable component for rendering tab icons.
// It receives the icon component itself and the color provided by the tab navigator.
function TabBarIcon(props: {
  icon: React.ComponentType<{ color: string; size: number }>;
  color: string;
}) {
  return <props.icon size={28} color={props.color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerShown: false, // Headers will be handled within each screen
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon icon={Home} color={color} />,
        }}
      />
      <Tabs.Screen
        name="findDoc"
        options={{
          title: "Find",
          tabBarIcon: ({ color }) => <TabBarIcon icon={Search} color={color} />,
        }}
      />
      <Tabs.Screen
        name="verifyDoc"
        options={{
          title: "Verify",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={ScanLine} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <TabBarIcon icon={LogIn} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu" // As seen in screenshots
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <TabBarIcon icon={Menu} color={color} />,
        }}
      />
    </Tabs>
  );
}

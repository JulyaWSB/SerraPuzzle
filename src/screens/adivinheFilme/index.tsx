import React, { useEffect, useState } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";

interface Filme {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
}

interface Genero {
  id: number;
  name: string;
}

const ChaveApi = "b9eae1c1b626c8da74fe89ecb75e9ed8";



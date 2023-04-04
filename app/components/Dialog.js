import React, { useState } from 'react';
import { AlertDialog, Center, Button, Text } from 'native-base';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from '../common/color';

export default Dialog = ({isShow, data, onClose}) => {
    
    return <Center>
        <AlertDialog isOpen={isShow} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Detail Information</AlertDialog.Header>
            <AlertDialog.Body>
              <Text>{data.content?data.content:'Nothing!'}</Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <MaterialCommunityIcons name="calendar" size={20} color={color.color_primary} />
              <Text color={color.color_blue}>{data.date?data.date:'Unknown'}</Text>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
  };
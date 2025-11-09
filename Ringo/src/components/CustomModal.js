import React from "react";
import { Modal, Dimensions } from "react-native";
import styled from "styled-components/native";
import colors from "../constants/colors";
import { PtdBText, PtdText } from "./CustomText";

const { width, height } = Dimensions.get("window");

const CustomModal = ({
    visible,
    title,
    content,
    confirmText = "확인",
    cancelText,
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <ModalOverlay>
                <ModalContainer>
                    <ModalContent>
                        {title && <ModalTitle>{title}</ModalTitle>}
                        <ModalMessage>{content}</ModalMessage>

                        <ButtonRow>
                            {cancelText && (
                                <ModalButton cancel onPress={onCancel}>
                                    <ModalButtonText cancel>{cancelText}</ModalButtonText>
                                </ModalButton>
                            )}
                            <ModalButton onPress={onConfirm}>
                                <ModalButtonText>{confirmText}</ModalButtonText>
                            </ModalButton>
                        </ButtonRow>
                    </ModalContent>
                </ModalContainer>
            </ModalOverlay>
        </Modal>
    );
};

export default CustomModal;

const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    width: ${width * 0.7}px;
    background-color: white;
    border-radius: 20px;
    padding: 24px 20px;
    shadow-color: #000;
    shadow-opacity: 0.15;
    shadow-radius: 8px;
    elevation: 5;
`;

const ModalContent = styled.View`
    align-items: center;
`;

const ModalTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.02}px;
`;

const ModalMessage = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    text-align: center;
    margin-bottom: ${width * 0.05}px;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

const ModalButton = styled.TouchableOpacity`
    padding: 10px 25px;
`;

const ModalButtonText = styled(PtdBText)`
    color: ${({ cancel }) => (cancel ? "#E0E0E0" : "#14C871")};
    font-size: ${width * 0.04}px;
`;

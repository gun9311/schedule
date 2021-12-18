package ru.project.fitstyle;

import ru.project.fitstyle.exception.UnauthorizedException;
import ru.project.fitstyle.tabs.TestTab;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.KeyEvent;

public class MainWindow {
    public void createWindow() {
        JFrame frame = new JFrame("Admin control panel");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        createUI(frame);

        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension dimension = toolkit.getScreenSize();
        frame.setVisible(true);
        frame.setSize((int)dimension.getWidth() / 2, (int)dimension.getHeight() / 2);
        frame.setLocation((int)(dimension.getWidth() - frame.getWidth()) / 2, (int)(dimension.getHeight() - frame.getHeight()) / 2);
        frame.setLocationRelativeTo(null);
    }

    private void createUI(final JFrame frame){

        ImageIcon icon = new ImageIcon(ClassLoader.getSystemResource("icon.png"));
        frame.setIconImage(icon.getImage());

        JTabbedPane tabs = new JTabbedPane();
//        tabs.addChangeListener(listener -> {
//
//        });

        JFrame jFrame = new JFrame();

        JPanel roleAssigment = new JPanel(false);
//        JLabel roleAssigmentLabel = new JLabel("Назначение ролей");
//        roleAssigmentLabel.setHorizontalAlignment(JLabel.CENTER);
//        roleAssigment.setLayout(new GridLayout(1, 1));
//        roleAssigment.add(roleAssigmentLabel);

        JPanel subscriptionTypeAdding = new JPanel(false);
//        JLabel subscriptionTypeAddingLabel = new JLabel("Добавление типов абонементов");
//        subscriptionTypeAddingLabel.setHorizontalAlignment(JLabel.CENTER);
//        subscriptionTypeAdding.setLayout(new GridLayout(1, 1));
//        subscriptionTypeAdding.add(subscriptionTypeAddingLabel);

        JPanel trainingTypeAdding = new JPanel(false);

        JPanel roleAdding = new JPanel(false);

        JPanel test = new JPanel(false);
        try {
            test = new TestTab().createJPanel();
        } catch (UnauthorizedException e) {
            e.printStackTrace();
        }

        tabs.addTab("Назначение ролей", null, roleAssigment,"Назначить роль пользователю");
        tabs.setMnemonicAt(0, KeyEvent.VK_1);

        tabs.addTab("Добавление типов абонементов", null, subscriptionTypeAdding,"Добавить новый тип абонемента");
        tabs.setMnemonicAt(1, KeyEvent.VK_2);

        tabs.addTab("Добавление типов тренировок", null, trainingTypeAdding,"Добавить новый тип групповой тренировки");
        tabs.setMnemonicAt(2, KeyEvent.VK_3);

        tabs.addTab("Добавление ролей", null, roleAdding,"Добавить новую роль");
        tabs.setMnemonicAt(3, KeyEvent.VK_4);

        tabs.addTab("Тест", null, test,"Tab 2 tooltip");
        tabs.setMnemonicAt(4, KeyEvent.VK_5);

        frame.getContentPane().add(tabs, BorderLayout.CENTER);
    }
}
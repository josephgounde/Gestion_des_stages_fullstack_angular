package com.groupe.gestionDesStages.security;

import com.groupe.gestionDesStages.models.Admin;
import com.groupe.gestionDesStages.models.Role;
import com.groupe.gestionDesStages.models.enums.ERole;
import com.groupe.gestionDesStages.repository.RoleRepository;
import com.groupe.gestionDesStages.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import static java.rmi.server.LogStream.log;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class InitAdminConfig {
    // Code désactivé - voir ResetAdminPassword.java
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Bean
    public CommandLineRunner initAdmin() {
        return args -> {
            System.out.println("Verification des utilisateurs existants: " + utilisateurRepository.count());

            // Afficher tous les utilisateurs existants
            utilisateurRepository.findAll().forEach(user ->
                    System.out.println("Utilisateur existant: " + user.getEmail() + " - Role: " + user.getRole())
            );
            log("creation de l'admin par defaut");

            Role role = roleRepository.findByName(ERole.ADMIN).orElseThrow(
                    ()-> new EntityNotFoundException("aucun role ADMIN trouve"+ERole.ADMIN));

            // Créer admin@test.com TOUJOURS
            Admin testAdmin = new Admin();
            testAdmin.setEmail("admin@test.com");
            testAdmin.setMotDePasse(passwordEncoder.encode("test123"));
            testAdmin.setRole(role);
            testAdmin.setActif(true);

            try {
                utilisateurRepository.save(testAdmin);
                System.out.println("=== ADMIN TEST CREE: email=admin@test.com, password=test123 ===");
            } catch (Exception e) {
                System.out.println("Erreur creation admin: " + e.getMessage());
            }
        };
    }
}


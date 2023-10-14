package com.rut_mental_health_care.service;

import com.rut_mental_health_care.entity.Thread;
import com.rut_mental_health_care.repository.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    public void createNewThread(Thread thread) {
        threadRepository.save(thread);
    }



}
